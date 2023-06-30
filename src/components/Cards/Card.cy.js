import Card from './Card.vue'

describe('<Card />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Card)
  })
})