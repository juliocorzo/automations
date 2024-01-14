import type { CreateStyled } from '@emotion/styled';

const withTransientProps: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export { withTransientProps };
