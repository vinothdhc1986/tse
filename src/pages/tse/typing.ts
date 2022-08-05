export default interface Props {
    value?: string | number | boolean;
    setInputValue?: CallableFunction;
    checked?: boolean;
    list?: any[];
    onChange?: CallableFunction;
    name?: string;
}