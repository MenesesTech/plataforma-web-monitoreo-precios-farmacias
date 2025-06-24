import re

class ProductNormalizer:
    """Clase para normalizar productos"""
    
    @staticmethod
    def normalize_text(text: str) -> str:
        """Eliminar acentos, espacios extra, términos promocionales y normalizar presentaciones"""
        if not text:
            return ""
            
        text = text.lower().strip()
        
        # Reemplazos de acentos
        replacements = {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ñ': 'n',
            'à': 'a', 'è': 'e', 'ì': 'i', 'ò': 'o', 'ù': 'u'
        }
        
        for a, b in replacements.items():
            text = text.replace(a, b)
        
        # Eliminar términos promocionales
        promotional_terms = ['super pack', 'pack', 'oferta', 'promocion', 'bebible']
        for term in promotional_terms:
            text = text.replace(term, '')
        
        # Normalizar unidades de medida
        text = text.replace('gr', 'g').replace('ml', 'ml').replace('un', 'un')
        text = re.sub(r'\b(\d+)\s*g\b', r'\1g', text)  # e.g., "900 g" -> "900g"
        text = re.sub(r'\b(\d+)\s*ml\b', r'\1ml', text)  # e.g., "220 ml" -> "220ml"
        
        # Normalizar presentaciones
        text = text.replace('lata', '').replace('frasco', '').replace('caja', '').replace('sobre', '')
        
        # Eliminar espacios múltiples
        text = ' '.join(text.split())
        
        return text