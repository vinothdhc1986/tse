export const userModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: '#F2F5F4',
      width: '580px',
      height: '571px',
      borderRadius: '10px',
    },
  };

  export const newUserInitValues = {
    UserName: '',
		EmailID: '',
		Role: '',
  };

  export const newUserInitValidation = {
    UserNameValid: false,
		EmailIDValid: false,
		RoleValid: false,
  }

  export enum UserRoles {
    'Discover Admin',
    'Acquirer / Merchant',
  }

  export const roles = [
    {
      value: '1',
      label: UserRoles[0],
    },
    {
      value: '2',
      label: UserRoles[1],
    },
  ];

  export const rolesDropdownStyles = {
    control: (base, state) => ({
      ...base,
      background: "#fff",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: '#EBEEED',
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,
      borderRadius: 0,
      marginTop: 0
    }),
    menuList: base => ({
      ...base,
      padding: 0
    })
  };
