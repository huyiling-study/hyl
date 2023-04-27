import { useCookies } from '@vueuse/integrations/useCookies'
const cookies = useCookies()
const Tokenkay = "admin-token"

export function getToken() {
    return cookies.get(Tokenkay)
}
export function setToken(token) {
    return cookies.set(Tokenkay, token)
}
export function removeToken() {
    return cookies.remove(Tokenkay)
}