import { Avatar, Card, CardHeader, IconButton, Typography } from '@mui/material'
import { Minus, Plus } from 'phosphor-react'
import { Product } from '../../model/Product'
import { currencyConverter } from '../helper/currencyConverter'

interface CartCardProps {
  product: Product
}

export function CartCard ({ product }: CartCardProps) {
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
            <IconButton>
              <Minus size={20} color="#000000" weight="fill" />
            </IconButton>
            <Typography>{product.amount}</Typography>
            <IconButton>
              <Plus size={20} color="#000000" weight="fill" />
            </IconButton>
          </div>
        }
      />
    </Card>
  )
}
