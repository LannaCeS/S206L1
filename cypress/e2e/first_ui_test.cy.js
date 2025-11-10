///<reference = cypress>
describe('test scenery', () => {
  it('visit site', () => {
    cy.visit('https://automationexercise.com/')
  })
  it('enter contact us page', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/contact_us"]').click()
    cy.get('h2.title.text-center').should('be.visible').and('contain', 'Get In Touch')
  })
  it('enter signup/login page', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.contains('h2', 'Login to your account').should('be.visible')
  })
  it('Perform failing login attempt', () => {
    cy.visit('https://automationexercise.com/')
    cy.get('a[href="/login"]').click()
    cy.get('[data-qa="login-email"]').type('teste@teste')
    cy.get('[data-qa="login-password"]').type('123')
    cy.get('[data-qa="login-button"]').click()
    cy.get('form').should('be.visible').and('contain', 'Your email or password is incorrect!')
  })
  it('Perform successfull login phase 1 attempt', () => {
    let user_data = generateUser()
    cy.contains('h2', 'Enter Account Information').should('be.visible')
  })
  it('Perform failling login phase 2 attempt', () => {
    let user_data = generateUser()
    cy.get('[data-qa="create-account"]').click()
    cy.contains('h2', 'Enter Account Information').should('be.visible')
  })
  it('Perform successfull login phase 2 attempt', () => {
    let user_data = generateUser()
  
    cy.get('#id_gender2').check()
    cy.get('#password').type(user_data[1])
    cy.get('#first_name').type('Teste')
    cy.get('#last_name').type('da Silva')
    cy.get('#address1').type('Street St.')
    cy.get('#state').type('Florida')
    cy.get('#city').type('Orlando')
    cy.get('#zipcode').type('12345')
    cy.get('#mobile_number').type('123456789')
    cy.get('[data-qa="create-account"]').click()
    cy.contains('h2', 'Account Created!').should('be.visible')
  })

})

function generateUser() {
  let hour = new Date().getHours().toString()
  let min = new Date().getMinutes().toString()
  let seconds = new Date().getSeconds().toString()
  let user = hour + min + seconds+ '@testUser.com'
  let password = hour + min + seconds+ 'testPassword'
  let infos  = [user, password]

  cy.visit('https://automationexercise.com/')
  cy.get('a[href="/login"]').click()
  cy.get('[data-qa="signup-name"]').type('teste')
  cy.get('[data-qa="signup-email"]').type(user)
  cy.get('[data-qa="signup-button"]').click()

  return infos
}