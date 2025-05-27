import React, { FC } from 'react';
import { IconType, IconBaseProps } from 'react-icons';

type Props = {
  icon: IconType;
} & IconBaseProps;

const Icon: FC<Props> = ({ icon: IconComponent, ...props }) => (<IconComponent role="icon" {...props} />);

export default Icon;
