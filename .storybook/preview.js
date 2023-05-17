import '../src/styles/_index.scss';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    hideNoControlsWarning: true,
    expanded: false,
    disabled: true,
  },
  docs: {
    source: {
      excludeDecorators: true,
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 32,
        // position: 'absolute',
        // top: '20%',
        // left: '50%',
        // right: 0,
        // bottom: 0,
        // transform: 'translateX(-50%)',
      }}
    >
      <div>
        <Story />
      </div>
    </div>
  ),
];
