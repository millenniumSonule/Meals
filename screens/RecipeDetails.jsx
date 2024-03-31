import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from @react-navigation/native
import * as Animatable from 'react-native-animatable';

const RecipeDetails = () => {

    const navigation = useNavigation();

    const route = useRoute();
    const recipeName = route.params ? route.params.recipeName : 'No recipe name provided';
    const [mealDetils, setMealDetails] = useState([]);
    const [wishListLike, setWishListLike] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [quantityIngredients, setQuantityIngredients] = useState([]);

    //API call to fetch meal detail
    useEffect(() => {
        fetchMealDetailsAPIcall(recipeName);
    }, []);

    const handleWishListLike = (x) => {
        if (x) {
            setWishListLike(false);
        } else {
            setWishListLike(true);
        }
    }

    const backScreenNavigate = () => {
        navigation.navigate('MainPage');
    }

    const fetchMealDetailsAPIcall = async (name) => {
        const ingradientList = [];
        const quantityList = [];
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
        try {
            const response = await axios.get(url);
            setMealDetails(response.data.meals);
            // ingredients.push(response.data.meals[0].strIngredient2)
           
            for (let i = 1; i <= 20; i++) {
                const temp = ((response.data.meals[0]['strIngredient' + i]));
                if (temp && temp.length > 0) {
                    ingradientList.push(temp);
                }
            }
            setIngredients(ingradientList);

            for (let i = 0; i <= ingradientList.length; i++) {
                const temp = ((response.data.meals[0]['strMeasure' + i]));
                if (temp && temp.length >= 1) {
                    quantityList.push(temp);
                }
                
            }
            setQuantityIngredients(quantityList);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (

        <Animatable.View animation="lightSpeedIn"  duration={3000} style={{ padding: 10 }}>
            <ScrollView vertical>
                {mealDetils.map((meals, index) => (
                    index === 0 && (
                        <View key={index}>
                            <View style={{ position: 'relative', height: 400 }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TouchableOpacity onPress={backScreenNavigate}>
                                        <Icon name="arrow-back-outline" size={45} color="white" style={{ zIndex: 1, marginLeft: 15, marginTop: 10 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleWishListLike(wishListLike)}>
                                        {wishListLike ? (
                                            <Icon name="heart-outline" size={45} color="white" style={{ zIndex: 1, marginRight: 15, marginTop: 10, color: 'red', backgroundColor: 'transparent', }} />
                                        ) : (
                                            <Icon name="heart" size={45} color="white" style={{ zIndex: 1, marginRight: 15, marginTop: 10, color: 'red', backgroundColor: 'transparent', }} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <Image source={{ uri: meals.strMealThumb }} style={{ width: '100%', height: '100%', borderRadius: 40, position: 'absolute', zIndex: -1 }} />
                            </View>

                            <Text style={{ fontSize: 30, color: 'black', marginTop: 20, fontFamily: 'Ubuntu-Regular' }}>{meals.strMeal}</Text>
                            <Text style={{ fontSize: 15, marginTop: 7, marginLeft: 5, fontFamily: 'Ubuntu-Regular' }}>{meals.strArea}</Text>

                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', alignContent: 'center' }}>
                                <View style={{ width: 70, height: 125, backgroundColor: 'orange', borderRadius: 30, alignItems: 'center' }}>
                                    <Icon name="time-outline" size={50} color="white" style={{ zIndex: 1, marginRight: 15, marginTop: 10, color: 'white', backgroundColor: 'transparent', marginLeft: 10 }} />
                                    <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Regular' }}>35 min</Text>
                                </View>

                                <View style={{ width: 70, height: 125, backgroundColor: 'orange', borderRadius: 30, alignItems: 'center' }}>
                                    <Icon name="people-outline" size={50} color="white" style={{ zIndex: 1, marginRight: 10, marginTop: 10, color: 'white', backgroundColor: 'transparent', marginLeft: 10 }} />
                                    <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Regular' }}>3 serv</Text>
                                </View>

                                <View style={{ width: 70, height: 125, backgroundColor: 'orange', borderRadius: 30, alignItems: 'center', justifyContent: '' }}>
                                    <Icon name="flame" size={50} color="white" style={{ zIndex: 1, marginRight: 10, marginTop: 10, color: 'white', backgroundColor: 'transparent', marginLeft: 10 }} />
                                    <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Regular' }}>700 cal</Text>
                                </View>

                                <View style={{ width: 70, height: 125, backgroundColor: 'orange', borderRadius: 30, alignItems: 'center', justifyContent: '' }}>
                                    <Icon name="library-outline" size={50} color="white" style={{ zIndex: 1, marginRight: 10, marginTop: 10, color: 'white', backgroundColor: 'transparent', marginLeft: 10 }} />
                                    <Text style={{ fontSize: 20, fontFamily: 'Ubuntu-Regular' }}>Easy</Text>
                                </View>



                            </View>

                            <Text style={{ color: 'black', fontSize: 30, marginTop: 10, marginBottom:10, fontFamily: 'Ubuntu-Regular' }}>
                                Ingredients
                            </Text>

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{ flexDirection: 'column',  width:'60%' }}>
                                    {ingredients && ingredients.map((ingredient, index) => (
                                        <View key={index} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ height: 10, width: 10, borderRadius: 100, backgroundColor: 'orange', marginRight: 10, }}></View>
                                                <Text style={{ fontSize: 20, color:'black', fontFamily: 'Ubuntu-Regular' }}>{ingredient}</Text>
                                            </View>

                                        </View>
                                    ))}
                                </View>



                                <View style={{ flexDirection: 'column' }}>
                                    {quantityIngredients && quantityIngredients.map((quantity, index) => (
                                        <View key={index} >
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 20, color:'grey', fontFamily: 'Ubuntu-Regular'}}>{quantity}</Text>
                                            </View>

                                        </View>
                                    ))}
                                </View>
                            </View>
                            <Text style={{fontSize:30,color:'black', marginTop:10, marginBottom:10, fontFamily: 'Ubuntu-Regular'}}>Instructions</Text>
                            <Text style={{color:'grey', fontFamily: 'Ubuntu-Regular'}}>{meals.strInstructions}</Text>
                        </View>

                    )
                    
                ))}
               
            </ScrollView>



        </Animatable.View>

    )
}

export default RecipeDetails

const styles = StyleSheet.create({})