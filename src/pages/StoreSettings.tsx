import { useState, useEffect } from 'react';
import { useStore } from '@/contexts/StoreContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StoreCategory, STORE_CATEGORIES } from '@/types/store';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Store as StoreIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StoreSettings = () => {
  const { currentStore, updateStore } = useStore();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'sembako' as StoreCategory,
    phone: '',
    address: '',
    cashier_name: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (currentStore) {
      setFormData({
        name: currentStore.name || '',
        category: currentStore.category || 'sembako',
        phone: currentStore.phone || '',
        address: currentStore.address || '',
        cashier_name: currentStore.cashier_name || '',
      });
    }
  }, [currentStore]);

  const handleSave = async () => {
    if (!currentStore) return;

    setIsSaving(true);
    const success = await updateStore(currentStore.id, formData);
    if (success) {
      toast({
        title: 'Sukses',
        description: 'Pengaturan toko berhasil disimpan',
      });
    }
    setIsSaving(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!currentStore) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Tidak ada toko yang dipilih</p>
          <Button onClick={() => navigate('/login')} className="mt-4">
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-2">
          <StoreIcon className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Pengaturan Toko</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Toko</CardTitle>
            <CardDescription>
              Kelola informasi dasar toko Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Toko</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Nama toko"
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori Toko</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value: StoreCategory) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STORE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Nomor telepon toko"
              />
            </div>

            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Alamat lengkap toko"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Kasir</CardTitle>
            <CardDescription>
              Pengaturan informasi kasir untuk nota
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="cashier_name">Nama Kasir</Label>
              <Input
                id="cashier_name"
                value={formData.cashier_name}
                onChange={(e) => handleInputChange('cashier_name', e.target.value)}
                placeholder="Nama kasir"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} className="min-w-32">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </div>
    </div>
  );
};