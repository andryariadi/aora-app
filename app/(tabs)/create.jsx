import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";

const Create = () => {
  const [uploading, setUploading] = useState(false);

  const [inputForm, setInputForm] = useState({
    title: "",
    thumnail: null,
    video: null,
    prompt: "",
  });

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField title="Video Title" placeholder="Give your video a catch title" value={inputForm.title} handleChangeInput={(e) => setInputForm({ ...inputForm, title: e })} otherStyles="mt-10" />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>

          <TouchableOpacity>
            {inputForm.video ? (
              <Video source={{ uri: inputForm.video.uri }} useNativeControls resizeMode={ResizeMode.COVER} isLooping className="bg-teal-500 w-full h-64 rounded-2xl" />
            ) : (
              <View className="bg-black-100 w-full h-44 rounded-2xl px-4 items-center justify-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 items-center justify-center">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2 h-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>

          <TouchableOpacity>
            {inputForm.thumnail ? (
              <Image source={{ uri: inputForm.thumnail.uri }} resizeMode="cover" className="bg-amber-500 w-full h-64 rounded-2xl" />
            ) : (
              <View className="bg-black-100 w-full h-16 border-2 border-black-200 rounded-2xl px-4 flex-row items-center justify-center space-x-2">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField title="AI Prompt" placeholder="The AI prompt for your video" value={inputForm.prompt} handleChangeInput={(e) => setInputForm({ ...inputForm, prompt: e })} otherStyles="mt-7" />

        <CustomButton title="Submit & Publish" handlePress={submit} containerStyles={"mt-7"} isLoading={uploading} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
