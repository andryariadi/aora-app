import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../libs/useAppwrite";
import { getUserPost, signOut } from "../../libs/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPost(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  // console.log(posts, user, setUser, setIsLoggedIn, "<----diprofile");

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full items-center justify-center px-4 mt-6 mb-12">
            <TouchableOpacity onPress={logout} className="w-full items-end mb-10">
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg items-center justify-center">
              <Image source={{ uri: user?.avatar }} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover" />
            </View>

            <InfoBox title={user?.username} containerStyles="mt-3" titleStyles="text-lg" />

            <View className="mt-5 flex-row">
              <InfoBox title={posts?.length || 0} subTitle="Posts" containerStyles="mr-10" titleStyles="text-xl" />

              <InfoBox title="1.2k" subTitle="Followers" titleStyles="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="No Videos Found with that query!" />}
      />
    </SafeAreaView>
  );
};

export default Profile;
