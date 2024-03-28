import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const CategoryList = () => {
    const categories = ['Food', 2, 3, 4]
  return (
    <FlatList
        data = {categories}
        renderItem={({item}) => (<Text>{item}</Text>)}
        horizontal
        contentContainerStyle={{columnGap: 30}}
    />
  )
}

export default CategoryList

const styles = StyleSheet.create({})