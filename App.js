import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
// Importar la biblioteca para las validaciones (react-hook-form)
import { useForm, Controller } from "react-hook-form";

export default function App() {
  // Definiciones del formulario con sus respectivos estados, errores, etc
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      password: "",
      age: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data); // objeto 
    const {fullname, email, phone, password, age} = data;
    console.log(fullname)
    reset();
  }
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 30,
          minLength: 2,
          pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre Completo"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="fullname"
      />
      {errors.fullname?.type == "required" && (
        <Text style={{ color: "red" }}>El nombre completo es obligatorio.</Text>
      )}
      {errors.fullname?.type == "maxLength" && (
        <Text style={{ color: "red" }}>
          El nombre completo debe tener, máximo, 30 caracters
        </Text>
      )}
      {errors.fullname?.type == "minLength" && (
        <Text style={{ color: "red" }}>
          El nombre completo debe tener, al menos, 2 caracters
        </Text>
      )}
      {errors.fullname?.type == "pattern" && (
        <Text style={{ color: "red" }}>
          El nombre completo permite solo letras y/o espacios
        </Text>)}

      <Button
        style={{marginTop:20}}
        icon="send"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Enviar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

