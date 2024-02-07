import { CreateStyled } from '@emotion/styled';

/**
 * Prevents forwaring of props starting with '$' in styled components when passed into a styled
 * component as a property
 * */
export const withTransientProps: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};
