import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import TrendingVideo from "../../components/TrendingVideo";
import EmptyState from "../../components/EmptyState";
import { useState } from "react";
import useAppwrite from "../../libs/useAppwrite";
import { getAllPosts, getLatesPosts } from "../../libs/appwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latesPosts } = useAppwrite(getLatesPosts);
  const [refreshing, setreFreshing] = useState(false);

  const onRefresh = async () => {
    setreFreshing(true);
    await refetch();
    setreFreshing(false);
  };

  // console.log(latesPosts, "<----dihome");
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList //alasan pake flatlist karena scrollview tidak bisa menggunakan scroll secara horizontal dan vertikal secara bersamaan
        // className="bg-blue-600 h-full"
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
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

            <SearchInput keyboardType="Search for a video topic" />

            <View className="bg-indigo-700 flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>

              <TrendingVideo posts={latesPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <EmptyState title="No Videos Found" subtitle="Be the first to upload a video" />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
