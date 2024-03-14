import { useMemo } from 'react';
import { Color, Material, MeshBasicMaterial, MeshToonMaterial } from 'three';

type Materials = {[name: string]: Material};

export function useToonMaterials(materials: Materials, opacity?: number) {
  const toonMaterials = useMemo(() => {
    const toonMaterials: Materials = {};

    for(const materialName of Object.keys(materials)) {
      const material = materials[materialName];
      
      const toonMaterial = new MeshToonMaterial();
    
      MeshBasicMaterial.prototype.copy.call(toonMaterial, material);

      if(opacity) {
        toonMaterial.transparent = true;
        toonMaterial.opacity = opacity;
      }

      toonMaterials[materialName] = toonMaterial;
    }

    return toonMaterials;
  }, [materials])

  return toonMaterials;
}