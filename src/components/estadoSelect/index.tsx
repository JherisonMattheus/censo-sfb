import * as Select from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'


const estados = [
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
        'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
        'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
        'SP', 'SE', 'TO'
    ];

type Props = {
    value: string
    onChange: (value: string) => void;
}

export default function EstadoSelect({value, onChange}: Props) {
    return (
        <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="flex w-full h-full items-center justify-between p-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-300"
        aria-label="Estado"
      >
        <Select.Value placeholder="Selecione" />
        <Select.Icon className="ml-2">
          <ChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position='popper'
          className="flex z-50 bg-white border border-gray-200 rounded-md shadow-md h-[200px] overflow-y-auto"
          style={{width: 'var(--radix-select-trigger-width)'}}
        >
          <Select.Viewport className="p-1">
            {estados.map((estado) => (
              <Select.Item
                key={estado}
                value={estado}
                className="flex items-center w-full px-6 py-1.5 text-sm text-slate-600 hover:text-black cursor-pointer select-none rounded-md hover:bg-blue-100 focus:bg-blue-200 data-[state=checked]:bg-blue-300"
              >
                <Select.ItemText>{estado}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-1">
                  <Check size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
    );
}