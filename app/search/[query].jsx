import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  console.log(query, "<---diquerypage");
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-white">{query}</Text>
    </SafeAreaView>
  );
};

export default Search;
