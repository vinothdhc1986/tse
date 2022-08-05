export const questionModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#F2F5F4',
        width: '762px',
        height: 'calc(100vh - 140px)',
        paddingTop: '0px',
        paddingBottom: '0px',
        borderRadius: '10px',
    },
};

export enum QuestionType {
    radio,
    text,
    number,
    dropdown,
    checkbox,
    textArea,
}

export const radioOptions: any[] = [{label: 'Yes', name: 'YN'}, {label: 'No', name: 'YN'}];

export const questionDropdownStyles = {
    control: (base, state) => ({
      ...base,
      background: "#F2F5F4",
      // match with the menu
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      // Overwrittes the different states of border
      borderColor: '#EBEEED',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  };