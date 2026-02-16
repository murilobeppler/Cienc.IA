from fastapi import APIRouter, HTTPException
from ..models.alphafold import (
    AlphaFoldPredictionRequest,
    AlphaFoldPredictionResponse,
    AlphaFoldSearchRequest,
    AlphaFoldSearchResponse
)
from ..services.alphafold_service import (
    get_alphafold_prediction,
    search_alphafold_by_gene
)

router = APIRouter(
    prefix="/alphafold",
    tags=["AlphaFold"]
)

@router.post("/prediction", response_model=AlphaFoldPredictionResponse)
async def get_prediction(request: AlphaFoldPredictionRequest):
    """
    Get AlphaFold structure prediction for a given UniProt ID.
    
    Example: Q5VSL9 (human MAP3K7)
    """
    result = await get_alphafold_prediction(request.uniprot_id)
    return AlphaFoldPredictionResponse(**result)

@router.post("/search", response_model=AlphaFoldSearchResponse)
async def search_by_gene(request: AlphaFoldSearchRequest):
    """
    Search for proteins by gene name.
    
    Example: TP53, BRCA1, EGFR
    """
    result = await search_alphafold_by_gene(request.gene_name)
    return AlphaFoldSearchResponse(**result)
