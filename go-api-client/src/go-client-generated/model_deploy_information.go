/*
 * ALICE Bookkeeping
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * API version: 0.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

// Deploy information
type DeployInformation struct {
	// The number of seconds that the server is online.
	Age float64 `json:"age"`
	// The unix timestamp of the moment that the the server went online.
	Start int32 `json:"start"`
}
