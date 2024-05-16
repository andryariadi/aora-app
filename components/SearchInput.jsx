import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ title, value, handleChangeInput, otherStyles, keyboardType, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center space-x-4">
      <TextInput className="flex-1 w-full text-white font-pregular" placeholderTextColor="#7b7b8b" value={value} onChangeText={handleChangeInput} secureTextEntry={title === "Password" && !showPassword} />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
