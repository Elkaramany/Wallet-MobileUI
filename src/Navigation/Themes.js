const DarkColors = {
    background: "#000000",
    foreground: "#FFFFFF",
    infoText: "#FFFFFF",
    darkGray: "#FFFFFF",
}

const LightColors = {
    background: "#FFFFFF",
    foreground: "#000000",
    infoText: "#868C93",
    darkGray: "#565d68",
}

const AllColors = {
    primary: '#310BE8',
    secondary: "#8200FF",
    tertiary1: "#0027FE",
    tertiary2: "D703FF",
    gradientButton: ['#D703FF', '#0027FE'],
    disabledButton: ["#9387ec", "#9387ec"],
    error: "#c83224",
    errorBg: "#fbf0ef",
    gray: "#DADEE3",
    inputGray: "#6c7077",
    lightGray: "#F4F6F9",
    loadingBackground: 'rgba(0, 0, 0, 0.5)',
    green: "#23A757",
    red: "#DA1414",
    lightPurple: "#E3E2FA",
    white: "#FFFFFF",
    black: "#000000",
}

export const DarkTheme = {
    dark: true,
    colors: {
        ...AllColors,
        ...DarkColors,
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
}

export const LightTheme = {
    dark: false,
    colors: {
        ...AllColors,
        ...LightColors,
        card: 'rgb(255, 255, 255)',
        text: 'rgb(28, 28, 30)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
}