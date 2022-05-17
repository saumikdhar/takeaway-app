import { checkValidity } from './LoginFormValidationRules';

describe('LoginFormValidationRules', () => {
  test('should pass when a email format is valid', () => {
    expect(checkValidity({ email: 'test@test.com' })).toBe(false);
  });

  test('should fail when a field is empty', () => {
    expect(checkValidity({ email: '' })).toEqual('is required!');
    expect(
      checkValidity('', {
        minLength: 3,
        maxLength: 20,
        validateName: true
      })
    ).toEqual('is required!');
    expect(checkValidity({ password: '' }, { minLength: 7, maxLength: 20 })).toEqual(
      'is required!'
    );
    expect(
      checkValidity('', {
        minLength: 10,
        maxLength: 10,
        validatePhone: true
      })
    ).toEqual('is required!');
  });

  test('should fail when a name is too short or too long', () => {
    expect(
      checkValidity('Hi', {
        minLength: 3,
        maxLength: 20,
        validateName: true
      })
    ).toEqual('needs to have minimum of 3 characters!');
    expect(
      checkValidity('thisIsObviouslyAInvalidNameSinceItsTooLong', {
        minLength: 3,
        maxLength: 20,
        validateName: true
      })
    ).toEqual('can only have a maximum of 20 characters!');
  });

  test('should fail when a name has an illegal character', () => {
    expect(
      checkValidity('Da#', {
        minLength: 3,
        maxLength: 20,
        validateName: true
      })
    ).toEqual('cannot have special characters!');
  });

  test('should pass when a name is valid', () => {
    expect(
      checkValidity('Daniel', {
        minLength: 3,
        maxLength: 20,
        validateName: true
      })
    ).toEqual(false);
  });

  test('should fail when the length of a phone number is greater or less than ten digits', () => {
    expect(
      checkValidity('751259431', {
        minLength: 10,
        maxLength: 10,
        validatePhone: true
      })
    ).toEqual('needs to have minimum of 10 characters!');
    expect(
      checkValidity('77512594311', {
        minLength: 10,
        maxLength: 10,
        validatePhone: true
      })
    ).toEqual('can only have a maximum of 10 characters!');
  });

  test('should fail when phone number is invalid', () => {
    expect(
      checkValidity('777777777#', {
        minLength: 10,
        maxLength: 10,
        validatePhone: true
      })
    ).toEqual('is invalid!');
  });

  test('should pass when phone number is valid', () => {
    expect(
      checkValidity('7645351525', {
        minLength: 10,
        maxLength: 10,
        validatePhone: true
      })
    ).toEqual(false);
  });
});
