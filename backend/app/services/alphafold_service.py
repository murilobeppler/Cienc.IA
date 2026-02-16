import httpx
from typing import Optional

ALPHAFOLD_DB_URL = "https://alphafold.ebi.ac.uk/api"

async def get_alphafold_prediction(uniprot_id: str) -> dict:
    """
    Fetch AlphaFold structure prediction from AlphaFold DB.
    
    Args:
        uniprot_id: UniProt accession ID (e.g., Q5VSL9, P12345)
        
    Returns:
        dict with PDB data and metadata
    """
    try:
        # Get structure metadata
        async with httpx.AsyncClient() as client:
            # Check if prediction exists
            response = await client.get(
                f"{ALPHAFOLD_DB_URL}/prediction/{uniprot_id}",
                timeout=10.0
            )
            
            if response.status_code == 404:
                return {
                    "success": False,
                    "error": f"Nenhuma predição encontrada para {uniprot_id}"
                }
            
            response.raise_for_status()
            metadata = response.json()
            
            # Get PDB file
            pdb_url = metadata[0]['pdbUrl'] if isinstance(metadata, list) else metadata['pdbUrl']
            
            pdb_response = await client.get(pdb_url, timeout=10.0)
            pdb_response.raise_for_status()
            pdb_data = pdb_response.text
            
            return {
                "success": True,
                "pdb_data": pdb_data,
                "metadata": metadata,
                "uniprot_id": uniprot_id
            }
            
    except httpx.TimeoutException:
        return {
            "success": False,
            "error": "Timeout ao acessar AlphaFold Database"
        }
    except httpx.HTTPStatusError as e:
        return {
            "success": False,
            "error": f"Erro HTTP {e.response.status_code}: {e.response.text}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Erro: {type(e).__name__} - {str(e)}"
        }

async def search_alphafold_by_gene(gene_name: str) -> dict:
    """
    Search AlphaFold predictions by gene name.
    
    Args:
        gene_name: Gene name (e.g., TP53, BRCA1)
        
    Returns:
        dict with search results
    """
    try:
        async with httpx.AsyncClient() as client:
            # Use UniProt API to search by gene name
            uniprot_search_url = f"https://rest.uniprot.org/uniprotkb/search?query=gene:{gene_name}+AND+reviewed:true&format=json&size=5"
            
            response = await client.get(uniprot_search_url, timeout=10.0)
            response.raise_for_status()
            
            data = response.json()
            
            if not data.get('results'):
                return {
                    "success": False,
                    "error": f"Gene {gene_name} não encontrado no UniProt"
                }
            
            results = []
            for entry in data['results'][:5]:  # Limit to 5 results
                uniprot_id = entry['primaryAccession']
                protein_name = entry.get('proteinDescription', {}).get('recommendedName', {}).get('fullName', {}).get('value', 'Unknown')
                organism = entry.get('organism', {}).get('scientificName', 'Unknown')
                
                results.append({
                    "uniprot_id": uniprot_id,
                    "protein_name": protein_name,
                    "gene_name": gene_name,
                    "organism": organism
                })
            
            return {
                "success": True,
                "results": results
            }
            
    except Exception as e:
        return {
            "success": False,
            "error": f"Erro na busca: {type(e).__name__} - {str(e)}"
        }
