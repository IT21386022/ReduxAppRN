import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByNumber } from "./CounterSlies";
import { Button, View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  const [incrementamount, setIncrementamount] = useState(0);
  const addValue = Number(incrementamount) || 0;

  const resetAll = () => {
    setIncrementamount(0);
    dispatch(reset());
  };
  return (
    <View>
      <Text>{count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />

      <TextInput
        type="text"
        value={incrementamount.toString()}
        onChangeText={(text) => setIncrementamount(text)}
      ></TextInput>

      <Button
        title="Add Amount"
        onPress={() => dispatch(incrementByNumber(addValue))}
      />
      <Button title="Reset" onPress={() => resetAll()} />
    </View>
  );
};

export default Counter;
