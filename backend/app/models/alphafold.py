from pydantic import BaseModel
from typing import Optional, List

class AlphaFoldPredictionRequest(BaseModel):
    uniprot_id: str

class AlphaFoldSearchRequest(BaseModel):
    gene_name: str

class AlphaFoldPredictionResponse(BaseModel):
    success: bool
    pdb_data: Optional[str] = None
    metadata: Optional[dict] = None
    uniprot_id: Optional[str] = None
    error: Optional[str] = None

class ProteinSearchResult(BaseModel):
    uniprot_id: str
    protein_name: str
    gene_name: str
    organism: str

class AlphaFoldSearchResponse(BaseModel):
    success: bool
    results: Optional[List[ProteinSearchResult]] = None
    error: Optional[str] = None
