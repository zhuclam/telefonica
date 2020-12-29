import React from 'react'
import styled from 'styled-components'

export interface SwitchProps {
  label?: string
  onChange: (checked: boolean) => void
  checked: boolean
}

const Switch: React.FC<SwitchProps> = ({ label = '', onChange, checked }) => (
  <SwitchContainer>
    <input
      type="checkbox"
      id={`${label.split(' ').join('-')}-check`}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <label htmlFor={`${label.split(' ').join('-')}-check`}>
      {label || <span>&nbsp;</span>}
    </label>
  </SwitchContainer>
)

const SwitchContainer = styled.div`
  display: inline-block;
  position: relative;
  font-size: 16px;
  line-height: 24px;

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 36px;
    height: 20px;
    opacity: 0;
    z-index: 0;

    :checked + label:before {
      background-color: rgba(63, 81, 181, 0.5);
    }

    :checked + label:after {
      left: 16px;
      background-color: cornflowerblue;
      border-color: cornflowerblue;
    }
  }

  label {
    display: block;
    padding: 0 0 0 44px;
    cursor: pointer;
    color: #fff;

    ::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 0;
      width: 36px;
      height: 14px;
      background-color: #999;
      border-radius: 14px;
      z-index: 1;
      transition: background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 0;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: 1px solid #ededed;
      border-radius: 14px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      z-index: 2;
      transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: left, background-color, border-color;
    }
  }
`

export { Switch }
