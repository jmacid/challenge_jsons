const before = require('./before.json')
const after = require('./after.json')

const findUnmatched =  (objA, objB) => {
  const unmatched = {}

  Object.keys(objA).forEach( (brand) => {
    if( brand in objB){
      // Brand exists in objB
      objA[brand].forEach( (model) => {
        
        // includes() time complexity = O(n). The search algorithm can be replaced by a more efficient one
        if(!objB[brand].includes(model)){
            
          (unmatched[brand] instanceof Array) ?
          unmatched[brand].push(model) :
          unmatched[brand] = [model]
        }
      })
    }
    else{
      // Entire brand is missing in ObjB
      unmatched[brand] = []
      for(const model of objA[brand]){
        unmatched[brand].push(model)
      }
    }
  })
  
  return unmatched
}

const removed = findUnmatched(before, after)
const added = findUnmatched(after, before)

const output = {removed, added}

const outputJSON = JSON.stringify(output)
console.log(outputJSON)