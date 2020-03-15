import styled from 'styled-components/native';

import { RNCamera } from 'react-native-camera';
import { RectButton } from 'react-native-gesture-handler';

import { BoxShadow } from '~/components/BoxShadow';
import Button from '~/components/Button';

export const PictureContainer = styled(BoxShadow)`
  flex: 1;
  position: relative;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
  position: relative;
`;

export const Picture = styled.Image`
  flex: 1;
  position: relative;
`;

export const TakePicButton = styled(RectButton)`
  position: absolute;
  align-self: center;
  bottom: 22px;
  height: 64px;
  width: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.26);
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  background: #7d40e7;
`;
