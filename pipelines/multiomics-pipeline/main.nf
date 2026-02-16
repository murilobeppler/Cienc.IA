#!/usr/bin/env nextflow

nextflow.enable.dsl=2

/*
 * Workflow entry point for CiencIA Multi-omics Pipeline
 */

workflow {
    log.info """
    ================================================================
    C i e n c I A   -   M U L T I - O M I C S   P I P E L I N E
    ================================================================
    """
    
    // Placeholder for actual logic
    // In the future we will call sub-workflows here like:
    // GENOMICS()
    // TRANSCRIPTOMIC()
    // INTEGRATION()
    
    main:
        sayHello()
}

process sayHello {
    output:
        stdout
    
    script:
    """
    echo 'Hello from CiencIA Nextflow Core!'
    """
}
