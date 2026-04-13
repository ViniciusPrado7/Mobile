import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { listarSenhas, deletarSenha } from "../service/senhaService";

export default function HistoricoSenha({ navigation }) {
  const [dados, setDados] = useState([]);
  const [mostrar, setMostrar] = useState({});
  const foco = useIsFocused();

  const carregar = async () => {
    try {
      const res = await listarSenhas();
      setDados(res.data);
      setMostrar({});
    } catch (e) {
      console.log(e);
      alert("Erro ao carregar senhas");
    }
  };

  useEffect(() => {
    if (foco) carregar();
  }, [foco]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HISTÓRICO DE SENHAS</Text>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={{ letterSpacing: 2 }}>
                {mostrar[item.id] ? item.pass : "********"}
              </Text>
            </View>

            <View style={styles.actions}>
              <Pressable
                onPress={() =>
                  setMostrar((p) => ({ ...p, [item.id]: !p[item.id] }))
                }
              >
                <Text>{mostrar[item.id] ? "👁️" : "😑"}</Text>
              </Pressable>

              <Pressable
                onPress={async () => {
                  await Clipboard.setStringAsync(item.pass);
                  alert("Senha copiada!");
                }}
              >
                <Text>✋</Text>
              </Pressable>

              <Pressable
                onPress={async () => {
                  try {
                    await deletarSenha(item.id);
                    carregar();
                  } catch (e) {
                    console.log(e);
                    alert("Erro ao deletar");
                  }
                }}
              >
                <Text>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={{ color: "#fff" }}>VOLTAR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#3b82f6",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
  name: { fontWeight: "bold" },
  actions: { flexDirection: "row", gap: 10 },
  btn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
});