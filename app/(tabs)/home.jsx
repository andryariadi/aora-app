import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        // className="bg-blue-600 h-full"
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <Text className="bg-amber-500 text-3xl text-white">{item.id}</Text>}
        ListHeaderComponent={() => (
          <View className="bg-rose-500 my-6 px-4 space-y-6">
            <View className="bg-gray-200 flex-row justify-between items-center mb-6">
              <View className="bg-lime-500">
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="text-2xl text-white font-psemibold">Andry Ariadi</Text>
              </View>

              <View>
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            <SearchInput />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
