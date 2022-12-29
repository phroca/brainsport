import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';
const CheckBoxContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const CheckBoxTouchable = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const CheckBoxLabel = styled.Text`
    color: #FFF;
`
const CheckBox = (props) => {

    const iconName = props.value ? "checkbox-marked" : "checkbox-blank-outline";

    return (
        <CheckBoxContainer>
            <CheckBoxTouchable activeOpacity={false} onPress={props.onPress}>
                <MaterialCommunityIcons name={iconName} size={24} color="#FFF" />
                <CheckBoxLabel>{props.label}</CheckBoxLabel>
            </CheckBoxTouchable>
            
        </CheckBoxContainer>
    )
}

export default CheckBox;