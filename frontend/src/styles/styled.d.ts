// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      background: string;
      surface: string;
      border: string;
      text: string;
      textSecondary: string;
      success: string;
      error: string;
      warning: string;
      info: string;
    };
  }
}
