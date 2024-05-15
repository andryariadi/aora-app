import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({ title, value, handleChangeInput, otherStyles, keyboardType, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <View className="w-full h-16 bg-black-100 px-4 border-2 border-black-200 rounded-2xl focus:border-secondary flex-row items-center">
        <TextInput className="flex-1 w-full text-white font-psemibold text-base" placeholderTextColor="#7b7b8b" value={value} onChangeText={handleChangeInput} secureTextEntry={title === "Password" && !showPassword} />

        {title === "Username" && (
          <TouchableOpacity>
            <Image source={icons.user} className="w-5 h-5 text-slate-500" resizeMode="contain" />
          </TouchableOpacity>
        )}

        {title === "Email" && (
          <TouchableOpacity>
            <Image source={icons.email} className="w-5 h-5 text-slate-500" resizeMode="contain" />
          </TouchableOpacity>
        )}

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
