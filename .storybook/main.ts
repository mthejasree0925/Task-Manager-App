import { mergeConfig } from "vite";

export default {
  stories: ["../storybook/stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@chromatic-com/storybook",
     '@storybook/addon-essentials',
  ],
  
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
   docs: {
    autodocs: true, // Enables Docs tab for each story
  },
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "react-native": "react-native-web",
        },
      },
    });
  },
};
