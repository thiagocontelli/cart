import { Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material'
import { Minus, Plus } from 'phosphor-react'
import { Product } from '../../model/Product'
import { currencyConverter } from '../helper/currencyConverter'

interface CartCardProps {
  product: Product
  onClickMinus: () => void
  onClickPlus: () => void
}

export function CartCard ({ product, onClickMinus, onClickPlus }: CartCardProps) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={product.thumbnail} />
        }
        title={product.title}
        subheader={currencyConverter(product.price)}
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <IconButton onClick={onClickMinus}>
              <Minus size={20} color="#000000" weight="fill" />
            </IconButton>
            <Typography>{product.amount}</Typography>
            <IconButton onClick={onClickPlus}>
              <Plus size={20} color="#000000" weight="fill" />
            </IconButton>
          </div>
        }
      />
    </Card>
  )
}
