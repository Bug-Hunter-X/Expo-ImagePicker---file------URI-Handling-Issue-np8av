```javascript
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image'; // Or your preferred image component
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const base64 = await convertUriToBase64(result.uri);
      setImageUri(`data:image/jpeg;base64,${base64}`);
    }
  };

  const convertUriToBase64 = async (uri) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const buffer = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    return buffer;
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default App;
```