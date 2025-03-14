import * as React from "react";
import { View, Image } from "react-native";
import styles from "../../static/styles/LoginHeaderStyles";

function LoginHeader() {
  return (
    <View style={styles.headerContainer}>
      <Image
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel="Company logo"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f5a0553aa9896f1ede9d5a5fd6ef98e27265183c44dc0af63340b40202a5b3f9?placeholderIfAbsent=true&apiKey=374ad6a310a543b0ae577aa7b0d0737e",
        }}
        style={styles.logoImage}
      />
    </View>
  );
}

export default LoginHeader;
