import { View, Text } from "react-native";

const InfoBox = ({ title, subTitle, containerStyles, titleStyles }) => {
  return (
    <View className={`bg-amber-500 ${containerStyles}`}>
      <Text className={`${titleStyles} text-white text-center font-psemibold`}>{title}</Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">{subTitle}</Text>
    </View>
  );
};

export default InfoBox;
