module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    skeletonScreen: {
        green: {
        baseColor: '#f2f5f4',
        movingColor: 'green',
        duration: '1s',
        timing: 'linear',
      },
  },
  },
  plugins: [
    require('@gradin/tailwindcss-skeleton-screen'),
  ],
}
