import React from 'react';

interface IProps {
  label: string | undefined;
  content?: React.ReactNode;
  opcional?: boolean;
  error?: string;
  style?: React.CSSProperties;
}

export const FieldContent: React.FC<IProps> = (props) => {
  return (
    <div className='flex flex-col gap-1'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {props.label && props.label}

        {props.opcional && <div style={{ backgroundColor: '#E9ECEF', borderRadius: '14px', padding: '2px 8px' }}>Opcional</div>}
      </div>
      {props.content}
      {!!props.error && props.error}
    </div>
  );
};
