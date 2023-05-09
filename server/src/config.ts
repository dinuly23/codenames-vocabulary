export const config = {
    nodeEnv: (process.env.NODE_ENV || 'production') as NodeEnv,
    colorize: (process.env.NO_CONSOLE_COLORS || '0') == '0',
    httpPort: (process.env.PORT || '8095')
};


export type NodeEnv = 'production' | 'development'
