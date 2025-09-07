import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { getUnitDisplay, getUnitOptions, getUnitMultiplier } from '@/lib/units';

interface QuantitySelectorProps {
  quantity: number;
  productName?: string;
  category?: string;
  maxStock?: number;
  onQuantityChange: (quantity: number) => void;
  onRemove?: () => void;
  showUnitSelector?: boolean;
  allowBulkPricing?: boolean;
  currentPrice?: number;
  onPriceChange?: (price: number) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const QuantitySelector = ({
  quantity,
  productName,
  category,
  maxStock,
  onQuantityChange,
  onRemove,
  showUnitSelector = false,
  allowBulkPricing = false,
  currentPrice,
  onPriceChange,
  onKeyDown
}: QuantitySelectorProps) => {
  const [selectedUnit, setSelectedUnit] = useState('pcs');
  const [unitQuantity, setUnitQuantity] = useState(0);
  const [customPrice, setCustomPrice] = useState<string>('');

  const unitOptions = getUnitOptions(productName, category);
  const unitDisplay = getUnitDisplay(quantity, productName, category);
  const canEditPrice = allowBulkPricing && quantity >= 12;

  // Initialize unit selector based on category
  useEffect(() => {
    if (category === 'Kertas') {
      setSelectedUnit('rim');
    } else {
      setSelectedUnit('pcs');
    }
  }, [category]);

  // Update custom price when currentPrice changes
  useEffect(() => {
    if (currentPrice && canEditPrice) {
      setCustomPrice(currentPrice.toString());
    }
  }, [currentPrice, canEditPrice]);

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    onQuantityChange(validQuantity);
  };

  const handleUnitQuantityChange = (value: number) => {
    if (value < 0) return;
    
    setUnitQuantity(value);
    const multiplier = getUnitMultiplier(selectedUnit, category);
    const totalQuantity = value * multiplier;
    onQuantityChange(totalQuantity);
  };

  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
    const multiplier = getUnitMultiplier(unit, category);
    const totalQuantity = unitQuantity * multiplier;
    onQuantityChange(totalQuantity);
  };

  const handlePriceChange = (value: string) => {
    setCustomPrice(value);
    const price = parseFloat(value);
    if (!isNaN(price) && onPriceChange) {
      onPriceChange(price);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <div className="space-y-3 quantity-selector">
      {/* Main quantity controls */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <Input
          type="number"
          value={quantity || ''}
          onChange={(e) => handleQuantityChange(Number(e.target.value) || 0)}
          onKeyDown={handleKeyDown}
          className="h-8 w-20 text-center text-sm"
          min="0"
          max={maxStock}
          placeholder="0"
        />
        
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={maxStock !== undefined && quantity >= maxStock}
        >
          <Plus className="h-3 w-3" />
        </Button>

        {onRemove && (
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 ml-2 text-error hover:bg-error hover:text-error-foreground"
            onClick={onRemove}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Unit selector */}
      {showUnitSelector && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Tambah dalam satuan:
          </Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={unitQuantity}
              onChange={(e) => handleUnitQuantityChange(parseInt(e.target.value) || 0)}
              className="h-8 w-16 text-center text-sm"
              min="0"
            />
            <Select value={selectedUnit} onValueChange={handleUnitChange}>
              <SelectTrigger className="h-8 flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {unitOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Display unit conversions */}
      {unitDisplay.length > 0 && quantity > 0 && (
        <div className="flex flex-wrap gap-1">
          {unitDisplay.slice(1).map((conversion, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {conversion.display}
            </Badge>
          ))}
        </div>
      )}

      {/* Bulk pricing editor */}
      {canEditPrice && onPriceChange && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            Harga khusus per lusin (≥1 lusin):
          </Label>
          <Input
            type="number"
            value={customPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="h-8 text-sm"
            placeholder="Harga total per lusin"
            min="0"
          />
          <div className="text-xs text-muted-foreground">
            Total untuk 1 lusin (12 pcs)
          </div>
        </div>
      )}
    </div>
  );
};