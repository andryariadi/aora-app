import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
// import * as DucumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../libs/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [inputForm, setInputForm] = useState({
    title: "",
    thumnail: null,
    video: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    //if you used documentpicker
    // const result = await DucumentPicker.getDocumentAsync({
    //   types: selectType === "image" ? ["image/png", "image/jpg", "image/jpeg"] : ["video/mp4, video/gif"],
    // });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setInputForm({ ...inputForm, thumnail: result.assets[0] });
      }

      if (selectType === "video") {
        setInputForm({ ...inputForm, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    if (!inputForm.title || !inputForm.prompt || !inputForm.thumnail || !inputForm.video) {
      return Alert.alert("Error", "Please fill in all the fields!");
    }

    setUploading(true);

    try {
      Alert.alert("Success", "Video uploaded successfully!");

      await createVideo({
        ...inputForm,
        userId: user.$id,
      });

      router.push("/home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setInputForm({
        title: "",
        thumnail: null,
        video: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField title="Video Title" placeholder="Give your video a catch title" value={inputForm.title} handleChangeInput={(e) => setInputForm({ ...inputForm, title: e })} otherStyles="mt-10" />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {inputForm.video ? (
              <Video source={{ uri: inputForm.video.uri }} resizeMode={ResizeMode.COVER} className="bg-teal-500 w-full h-64 rounded-2xl" />
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

          <TouchableOpacity onPress={() => openPicker("image")}>
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
