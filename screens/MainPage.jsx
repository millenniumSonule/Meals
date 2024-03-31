import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native
import * as Animatable from 'react-native-animatable';

const MainPage = () => {
    const [categoryData, setcategoryData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [activeCategory, setactiveCategory] = useState('');
    const [activeCategoryName, setactiveCategoryName] = useState('Dessert');
    const [categoryResult, setCategoryResult] = useState([]);
    const [firstTime, setFirstTime] = useState(true);
    const [showRecipeList, setShowRecipeList] = useState(true);
    const [searchMealResult, setSearchMealResult] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [noResultText, setNoResultText] = useState('');
    const handleTextChange = (inputText) => {
        setSearchText(inputText);
    };
    const navigation = useNavigation();

    //when pressed enter in search bar (search by main ingradient)
    const searchMeal = (searchText) => {
        setactiveCategoryName(searchText);
        setShowRecipeList(false);
        setactiveCategory('');
        searMealAPIcall(searchText);
        setSearchText(''); // its for after pressing enter in search bar it should be clear
        setFirstTime(false);
    };

    //api call for search meal by ingradient
    const searMealAPIcall = async (searchText) => {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`;
        try {
            const response = await axios.get(url);
            if (response.data.meals && response.data.meals.length) {
                setSearchMealResult(response.data.meals);
                setNotFound(false); // Reset notFound state if data found
                setNoResultText('');
            } else {
                setSearchMealResult([]); // Clear search results
                setNotFound(true);
                setNoResultText(`No results found for ${searchText} `)
                // setactiveCategoryName('No results found'); // Display "No results found" message

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    //to search or take action when pressed from categories 
    const handleCategoryPress = (id, name) => {
        setactiveCategory(id);
        setactiveCategoryName(name);
        setFirstTime(false);
        setNoResultText('')
        setShowRecipeList(true);
        fetchList(name)
        setSearchMealResult('');
    }

    //API call to fetch meals list from specfic categories
    const fetchList = async (name) => {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
        try {
            const responseCategoryResult = await axios.get(url);
            setCategoryResult(responseCategoryResult.data.meals);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }



    useEffect(() => {
        fetchList('Dessert');
        const fetchData = async () => {
            const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
            try {
                const response = await axios.get(url);
                setcategoryData(response.data.categories);
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        fetchData();

    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ alignItems: 'center', marginRight: 15, marginTop: 0 }}
            onPress={() => gotoRecipeDetailPage(item.strMeal)}>
                
            <View style={{ height: 140, width: 140, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginBottom: 10, backgroundColor: '#EEEEEE', margin: 20 }}>
                <Image source={{ uri: item.strMealThumb }} style={{ width: 140, height: 140, borderRadius: 30 }} />
            </View>
            <Text style={{ fontSize: 15, color:'grey', fontFamily: 'Ubuntu-Regular'}}>{item.strMeal.length > 20 ? `${item.strMeal.substring(0, 20)}...` : item.strMeal}</Text>
        </TouchableOpacity>
    );
    

    const renderItemSearch = ({ item }) => (

        <TouchableOpacity 
            style={{ alignItems: 'center', marginRight: 15, marginTop: 0 }}
            onPress={() => gotoRecipeDetailPage(item.strMeal)}
        >
            <View style={{ height: 140, width: 140, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginBottom: 10, backgroundColor: '#EEEEEE', margin: 20 }} onPress={ () =>  gotoRecipeDetailPage(item.strMeal)}>
                <Image source={{ uri: item.strMealThumb }} style={{ width: 140, height: 140, borderRadius: 30 }} />
            </View>
            <Text style={{ fontSize: 15, color:'grey', fontFamily: 'Ubuntu-Regular' }}>{item.strMeal.length > 20 ? `${item.strMeal.substring(0, 20)}...` : item.strMeal}</Text>
        </TouchableOpacity>
    );
    
    const gotoRecipeDetailPage = (recipeName) => {
        navigation.navigate("RecipeDetails",{ recipeName: recipeName });
    }
    Animatable.initializeRegistryWithDefinitions({
        myCustomAnimation: {
          from: { opacity: 0 },
          to: { opacity: 1 }
        }
      });
      
    return (
        <Animatable.View animation="myCustomAnimation" duration={1000}  style={{ flex: 1, paddingTop: 20, paddingLeft:20, paddingRight:20 , backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '400', fontSize: 40, color: 'black', fontFamily: 'Ubuntu-Regular', color: 'rgba(0, 0, 0, 0.5)' }}>Menu</Text>
                <Icon name="person" size={45} color="#FF7539" />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 40 }}>
                <TextInput
                    style={{ flex: 1, backgroundColor: '#EEEEEE', borderRadius: 100, fontSize: 20, paddingLeft: 40, paddingRight: 20, fontFamily: 'Ubuntu-Regular' }}
                    value={searchText}
                    onChangeText={handleTextChange}
                    onSubmitEditing={() => searchMeal(searchText)}
                    placeholder="Search meal by ingradient"
                    placeholderTextColor="#AAAAAA"
                />
                <Icon name="search-outline" size={24} color="#AAAAAA" style={{ position: 'absolute', left: 10 }} />
            </View>
            
            <Animatable.View animation="fadeInRightBig" duration={3000}>
            <ScrollView horizontal style={{ marginTop: 30, flexGrow: 0, flexShrink: 1 }} showsHorizontalScrollIndicator={false}>
                {categoryData.length >0 && categoryData.map((category, index) => (
                    <View key={index} style={{ marginRight: 15, marginBottom: 20 }}>

                        <TouchableOpacity style={{ alignItems: 'center' }} key={index} onPress={() => handleCategoryPress(category.idCategory, category.strCategory)}>
                            <View style={{ height: 80, width: 80, justifyContent: 'center', alignItems: 'center', borderRadius: 30, marginBottom: 10, backgroundColor: (firstTime === true && index === 2) || (activeCategory === category.idCategory) ? '#FF7539' : '#EEEEEE' }}>
                                <Image source={{ uri: category.strCategoryThumb }} style={{ width: 60, height: 60, borderRadius: 100 }} />
                            </View>
                            <Text style={{ fontSize: 15, color:'grey', fontFamily: 'Ubuntu-Regular' }}>{category.strCategory}</Text>

                        </TouchableOpacity>


                    </View>
                ))}
            </ScrollView>
            </Animatable.View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 30, color:'grey', fontFamily: 'Ubuntu-Regular'}}>Recipes for </Text>
                <Text style={{ fontSize: 30, color: '#FF7539', fontFamily: 'Ubuntu-Regular' }}>{activeCategoryName}</Text>
            </View>

            {noResultText !== '' && (
                <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <Image
                        source={require('../assets/noResultImg.png')}
                        style={{ height: 300, width: 300 }}
                    />
                    <Text style={{ fontSize: 20, color: 'grey', fontFamily: 'Ubuntu-Regular' }}>{noResultText}</Text>
                </View>
            )}


            {showRecipeList && (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={categoryResult}
                        renderItem={renderItem}
                        keyExtractor={(x) => x.idMeal}
                       
                        vertical
                        numColumns={2}
                        showsVerticalScrollIndicator={false} />
                </View>
            )}

            {!showRecipeList && (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={searchMealResult}
                        renderItem={renderItemSearch}
                        keyExtractor={(x) => x.idMeal}
                        vertical
                        numColumns={2}
                        showsVerticalScrollIndicator={false} />
                </View>

            )}






        </Animatable.View>
    );
};

export default MainPage;

const styles = StyleSheet.create({});
