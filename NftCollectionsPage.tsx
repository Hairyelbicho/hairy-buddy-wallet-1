
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { DollarSign, Hash } from 'lucide-react';

// Mock data for NFT collections
const mockNftCollections = [
  {
    id: 'mad-lads',
    name: 'Mad Lads',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlnaXRhbCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=300&q=60', // Example image
    floorPrice: '150 SOL',
    itemCount: 10000,
    description: 'A popular collection of unique digital collectibles on Solana.',
  },
  {
    id: 'tensorians',
    name: 'Tensorians',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60', // Example image
    floorPrice: '65 SOL',
    itemCount: 5000,
    description: 'Unique avatars for the Tensor Trade ecosystem.',
  },
  {
    id: 'claynosaurz',
    name: 'Claynosaurz',
    imageUrl: 'public/placeholder.svg', // Using local placeholder
    floorPrice: '30 SOL',
    itemCount: 7500,
    description: 'Adorable clay dinosaurs roaring on the blockchain.',
  },
];

const NftCollectionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCollectionClick = (collectionId: string) => {
    // Navigate to a detailed page for the collection, or implement other interaction
    console.log(`Clicked on collection: ${collectionId}`);
    // navigate(`/nft-collections/${collectionId}`); // Example for future detail page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Colecciones de NFTs</h1>
      {mockNftCollections.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay colecciones de NFT para mostrar.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNftCollections.map((collection) => (
            <Card 
              key={collection.id}
              className="bg-card/70 backdrop-blur-md border-wallet-blue/30 hover:border-wallet-blue/60 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
              onClick={() => handleCollectionClick(collection.id)}
            >
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-semibold text-white mb-2">{collection.name}</CardTitle>
                <CardDescription className="text-sm text-gray-400 mb-3 h-12 overflow-hidden">
                  {collection.description}
                </CardDescription>
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1 text-wallet-secondary" />
                    <span>{collection.floorPrice}</span>
                  </div>
                  <div className="flex items-center">
                    <Hash size={16} className="mr-1 text-wallet-secondary" />
                    <span>{collection.itemCount} items</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NftCollectionsPage;

