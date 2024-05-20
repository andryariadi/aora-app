import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ title, value, handleChangeInput, otherStyles, keyboardType, ...props }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");

  console.log(pathName, query, "<----dipathnamecomp");

  return (
    <View className="w-full h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
      <TextInput className="flex-1 w-full text-white font-pregular" placeholder={keyboardType} placeholderTextColor="#7b7b8b" value={value} onChangeText={(e) => setQuery(e)} />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Please input something to search result!");
          }

          if (pathName.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
