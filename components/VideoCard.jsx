import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "../constants";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-center gap-3">
        <View className="flex-row flex-1 items-center justify-center">
          <View className="w-[46px] h-[46px] justify-center items-center rounded-lg border border-secondary p-0.5">
            <Image source={{ uri: avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
          </View>

          <View className="flex-1 justify-center ml-3 gap-y-1">
            <Text className="text-white text-sm font-psemibold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-gray-100 text-xs font-pregular" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>

        <View className="">
          <Image source={icons.menu} className="w-5 h-6" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="w-full h-56 relative justify-center items-center rounded-xl mt-3">
          <Image source={{ uri: thumnail }} className="w-full h-full rounded-xl mt-3" resizeMode="cover" />

          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
