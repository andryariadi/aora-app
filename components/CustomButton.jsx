import { View, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl py-5 ${containerStyles} ${isLoading ? "opacity-50" : ""}`} disabled={isLoading}>
      <Text className={`text-primary text-lg text-center font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
